'use client';

import * as z from 'zod';
import axios from 'axios';
import qs from 'query-string';
import { useForm } from 'react-hook-form';
import { Plus, SmileIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { useModal } from '@/hooks/use-modal-store';

interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: 'conversations' | 'channel';
}

const formSchema = z.object({
  content: z.string().min(1),
});
export const ChatInput = ({ apiUrl, query, name, type }: ChatInputProps) => {

  const {onOpen} = useModal()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try{
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      });
      await axios.post(url,values);
    }
    catch (error){
      console.log(error)
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='relative p-4 pb-6'>
                  <button
                    type='button'
                    onClick={() => onOpen('messageFile',{apiUrl,query})}
                    className='absolute top-7 left-8 h-[24px] w-[24px] rounded-full bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition p-1 flex items-center justify-center'
                  >
                    <Plus className='text-white dark:text-[#323338]' />
                  </button>
                  <Input
                    disabled={isLoading}
                    className='px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200'
                    placeholder={`Message ${type === 'conversations' ? name : '#'+ name }`}
                    {...field}
                  />
                  <div className="absolute top-7 right-8">
                    <SmileIcon />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
