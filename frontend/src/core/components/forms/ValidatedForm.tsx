'use client';
import { useForm, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React from 'react';

export interface ValidatedFormProps<T extends Record<string, unknown>> {
  schema: yup.ObjectSchema<T>;
  onSubmit: SubmitHandler<T>;
  children: (methods: UseFormReturn<T>) => React.ReactNode;
}

export default function ValidatedForm<T extends Record<string, unknown>>({
  schema,
  onSubmit,
  children,
}: ValidatedFormProps<T>) {
  const methods = useForm<T>({ resolver: yupResolver(schema), mode: 'onBlur' });
  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>{children(methods)}</form>
  );
}
