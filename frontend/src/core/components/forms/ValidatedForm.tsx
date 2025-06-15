'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import {
  Resolver,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from 'react-hook-form';
import * as yup from 'yup';

export interface ValidatedFormProps<T extends Record<string, unknown>> {
  readonly schema: yup.ObjectSchema<T>;
  readonly onSubmit: SubmitHandler<T>;
  readonly children: (methods: UseFormReturn<T>) => React.ReactNode;
}

export default function ValidatedForm<T extends Record<string, unknown>>({
  schema,
  onSubmit,
  children,
}: ValidatedFormProps<T>) {
  const methods = useForm<T>({
    resolver: yupResolver(schema) as unknown as Resolver<T>,
    mode: 'onBlur',
  });
  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>{children(methods)}</form>
  );
}
