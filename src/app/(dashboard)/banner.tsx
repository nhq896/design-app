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
    <div className="shadow-soft relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2e62cb] via-[#0073ff] to-[#3faff5] p-8 text-primary-foreground">
      {/* background decoration */}
      <div className="absolute inset-0 bg-white/5" />
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/5" />

      <div className="relative flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="hidden size-24 items-center justify-center rounded-full bg-white/50 md:flex">
            <div className="flex size-16 items-center justify-center rounded-full bg-white">
              <Sparkles className="h-16 fill-[#0073ff] text-[#0073ff]" />
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <h1 className="text-xl font-bold md:text-3xl">Create beautiful designs with ease</h1>
            <p className="mb-2 text-xs md:text-sm">Turn your ideas into stunning visuals with our powerful design editor.</p>
            <Button disabled={isPending} onClick={handleCreateProject} variant="secondary" className="w-[160px] xl:hidden">
              Start creating <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>

        <Button disabled={isPending} onClick={handleCreateProject} variant="secondary" className="hidden w-[160px] xl:flex">
          Start creating <ArrowRight className="ml-2 size-4" />
        </Button>
      </div>
    </div>
  );
};
