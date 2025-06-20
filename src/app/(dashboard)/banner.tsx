'use client';

import { ArrowRight, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useCreateProject } from '@/features/projects/api/use-create-project';

export const Banner = () => {
  const router = useRouter();
  const { mutate: createProject, isPending } = useCreateProject();

  const handleCreateProject = () => {
    createProject(
      {
        name: 'Untitled Project',
        json: '',
        width: 900,
        height: 1200,
      },
      {
        onSuccess: (data) => {
          router.push(`/editor/${data.id}`);
        },
      },
    );
  };

  return (
    <div className="flex aspect-[5/1] min-h-[248px] items-center gap-x-6 rounded-xl bg-gradient-to-r from-[#2e62cb] via-[#0073ff] to-[#3faff5] p-6 text-white">
      <div className="hidden size-28 items-center justify-center rounded-full bg-white/50 md:flex">
        <div className="flex size-20 items-center justify-center rounded-full bg-white">
          <Sparkles className="h-20 fill-[#0073ff] text-[#0073ff]" />
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <h1 className="text-xl font-semibold md:text-3xl">Create beautiful designs with ease</h1>

        <p className="mb-2 text-xs md:text-sm">Turn your ideas into stunning visuals with our powerful design editor.</p>

        <Button disabled={isPending} onClick={handleCreateProject} variant="secondary" className="w-[160px]">
          Start creating <ArrowRight className="ml-2 size-4" />
        </Button>
      </div>
    </div>
  );
};
