import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import usePhoneMask from './usePhoneMask';

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: object) => void;
  }
}

export interface ContactFormValues {
  nome: string;
  email: string;
  telefone: string;
  servico: string;
  mensagem: string;
}

export type ContactField = keyof ContactFormValues;
export type ContactFormStatus = 'idle' | 'sending' | 'success' | 'error';

export interface UseContactFormOptions {
  initialValues?: Partial<ContactFormValues>;
  endpoint?: string;
  onSuccess?: () => void;
  requiredFields?: ContactField[];
  analyticsLabel?: string;
  payloadTransformer?: (values: ContactFormValues) => Record<string, unknown>;
}

const allFields: ContactField[] = ['nome', 'email', 'telefone', 'servico', 'mensagem'];
const defaultRequiredFields: ContactField[] = ['nome', 'email', 'telefone', 'servico'];

const defaultValues: ContactFormValues = {
  nome: '',
  email: '',
  telefone: '',
  servico: '',
  mensagem: ''
};

const createEmptyErrors = () =>
  allFields.reduce(
    (acc, field) => ({
      ...acc,
      [field]: ''
    }),
    {} as Record<ContactField, string>
  );

const createUntouched = () =>
  allFields.reduce(
    (acc, field) => ({
      ...acc,
      [field]: false
    }),
    {} as Record<ContactField, boolean>
  );

const useContactForm = ({
  initialValues,
  endpoint,
  onSuccess,
  requiredFields = defaultRequiredFields,
  analyticsLabel = 'Formulário de Contato Principal',
  payloadTransformer
}: UseContactFormOptions = {}) => {
  const baseValues = useMemo(() => ({ ...defaultValues, ...initialValues }), [initialValues]);
  const [values, setValues] = useState<ContactFormValues>(baseValues);
  const [errors, setErrors] = useState<Record<ContactField, string>>(createEmptyErrors);
  const [touched, setTouched] = useState<Record<ContactField, boolean>>(createUntouched);
  const [status, setStatus] = useState<ContactFormStatus>('idle');
  const [submitError, setSubmitError] = useState('');
  const formatPhone = usePhoneMask();

  useEffect(() => {
    setValues(baseValues);
  }, [baseValues]);

  const validateField = useCallback((field: ContactField, value: string) => {
    switch (field) {
      case 'nome':
        return value.trim().split(' ').length < 2 ? 'Informe nome e sobrenome.' : '';
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Informe um e-mail válido.';
      case 'telefone':
        return value.replace(/\D/g, '').length >= 10 ? '' : 'Telefone inválido.';
      case 'servico':
        return value ? '' : 'Selecione um assunto.';
      default:
        return '';
    }
  }, []);

  const handleBlur = useCallback(
    (field: ContactField) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      setErrors((prev) => ({ ...prev, [field]: validateField(field, values[field]) }));
    },
    [validateField, values]
  );

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = event.target;
      const fieldName = name as ContactField;
      const finalValue = fieldName === 'telefone' ? formatPhone(value) : value;

      setValues((prev) => ({ ...prev, [fieldName]: finalValue }));

      if (touched[fieldName]) {
        setErrors((prev) => ({ ...prev, [fieldName]: validateField(fieldName, finalValue) }));
      }
    },
    [formatPhone, touched, validateField]
  );

  const resetForm = useCallback(() => {
    setValues(baseValues);
    setErrors(createEmptyErrors());
    setTouched(createUntouched());
    setSubmitError('');
  }, [baseValues]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const newErrors = requiredFields.reduce(
        (acc, field) => ({
          ...acc,
          [field]: validateField(field, values[field])
        }),
        {} as Record<ContactField, string>
      );

      setErrors((prev) => ({ ...prev, ...newErrors }));
      setTouched((prev) => ({
        ...prev,
        ...requiredFields.reduce(
          (acc, field) => ({
            ...acc,
            [field]: true
          }),
          {} as Record<ContactField, boolean>
        )
      }));

      const isValid = Object.values(newErrors).every((error) => error === '');

      if (!isValid) {
        setSubmitError('Revise os campos destacados para continuar.');
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
        return;
      }

      if (!endpoint) {
        setSubmitError('Endpoint de contato não configurado. Defina VITE_FORMSPREE_CONTACT_URL.');
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
        return;
      }

      setSubmitError('');
      setStatus('sending');

      try {
        const payload = payloadTransformer ? payloadTransformer(values) : values;

        const response = await fetch(endpoint, {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          const data = await response.json().catch(() => null);
          throw new Error(data?.errors?.map((err: { message: string }) => err.message).join(', ') || 'Erro no envio.');
        }

        if (window.gtag) {
          window.gtag('event', 'generate_lead', {
            event_category: 'contact',
            event_label: analyticsLabel,
            value: 1
          });
        }

        setStatus('success');
        resetForm();

        setTimeout(() => {
          setStatus('idle');
          onSuccess?.();
        }, 4000);
      } catch (error) {
        setSubmitError((error as Error).message || 'Ocorreu um erro. Tente novamente.');
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    },
    [analyticsLabel, endpoint, onSuccess, payloadTransformer, requiredFields, resetForm, validateField, values]
  );

  return {
    values,
    errors,
    touched,
    status,
    submitError,
    setSubmitError,
    handleInputChange,
    handleBlur,
    handleSubmit,
    resetForm
  };
};

export default useContactForm;
