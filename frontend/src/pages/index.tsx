'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthCtx } from "@/contexts/AuthContext";
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { zodSchema } from "@/utils/form.schema";
import { FormSignInType } from "@/types/formTypes";
import { toast } from "react-toastify";

export default function Home() {
  const router = useRouter();
  const { signIn, isAuthenticated, error, loading } = useAuthCtx();

  useEffect(() => {
    if (isAuthenticated) router.push('/dashboard');
    {
      error && toast.error(error, {
        position: 'bottom-right',
        autoClose: 3000
      })
    }
  }, [isAuthenticated, error]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormSignInType>({ resolver: zodResolver(zodSchema) });

  const onSubmit: SubmitHandler<FormSignInType> = async (data) => signIn(data)
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#212121] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full space-y-8 align-center  bg-[#1a1a1a] rounded-md ">
        <div className="py-10 px-5 shadow-xl">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray">Sign in to your account</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px space-y-2">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  {...register('email')}
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-white text-gray rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
                <div>
                  <p className="text-sm text-red-800 font-semibold"> {errors.email && errors.email.message}</p>
                </div>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  {...register('password')}
                  type="password"
                  autoComplete="current-password"
                  required
                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-white text-gray rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                <div>
                  <p className="text-sm text-red-800 font-semibold">{errors.password && errors.password.message}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded border-[#1A1AA6]"
                />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm flex-row gap-2">
                <a href="/signUp" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Don't have an account?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <p>Icon</p>
                </span>
                {loading ? <p className="w-4 h-4 border-3  border-t-transparent rounded-full animate-spin"></p>
                  : <p>Sign in</p>
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
