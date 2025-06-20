'use client';

import { Loader2, TriangleAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useCreateProject } from '@/features/projects/api/use-create-project';
import { type ResponseType, useGetTemplates } from '@/features/projects/api/use-get-templates';

import { TemplateCard } from './template-card';

export const TemplatesSection = () => {
  const router = useRouter();

  const { mutate: createProject, isPending: isCreatingProject } = useCreateProject();
  const { data, isLoading, isError } = useGetTemplates({ page: '1', limit: '4' });

  const onClick = (template: ResponseType) => {
    createProject(
      {
        name: `${template.name} project`,
        json: template.json,
        width: template.width,
        height: template.height,
      },
      {
        onSuccess: (data) => {
          router.push(`/editor/${data.id}`);
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Start from a template</h3>

        <div className="flex h-32 items-center justify-center">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Start from a template</h3>

        <div className="flex h-32 flex-col items-center justify-center gap-y-4">
          <TriangleAlert className="size-6 text-muted-foreground" />

          <p>Failed to load templates.</p>
        </div>
      </div>
    );
  }

  if (!data?.length) return null;

  return (
    <div>
      <h3 className="text-lg font-semibold">Start from a template</h3>

      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
        {data.map((template) => (
          <TemplateCard
            key={template.id}
            title={template.name}
            imageSrc={template.thumbnailUrl || ''}
            onClick={() => onClick(template)}
            disabled={isCreatingProject}
            description={`${template.width} x ${template.height} px`}
            width={template.width}
            height={template.height}
            isPro={false}
          />
        ))}
      </div>
    </div>
  );
};
