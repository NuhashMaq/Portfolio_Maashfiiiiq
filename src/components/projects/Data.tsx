// File: data.tsx

import Image from 'next/image';
import { ChevronRight, Link, Network } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface ProjectLink {
  name: string;
  url: string;
}

interface ProjectImage {
  src: string;
  alt: string;
}

interface ArchitectureBlock {
  layer: string;
  details: string[];
}

interface ProjectContentItem {
  title: string;
  description: string;
  techStack: string[];
  date: string;
  links: ProjectLink[];
  images: ProjectImage[];
  architectureImages: ProjectImage[];
  architecture: ArchitectureBlock[];
}

// --- PROJECT DATABASE ---
// This array holds the detailed information for each project.
const PROJECT_CONTENT: ProjectContentItem[] = [
  {
    title: 'EduPredict - AI Performance Analysis Platform',
    description:
      'Built a full-stack web app with FastAPI and Next.js/React (TypeScript) for student performance risk prediction. Implemented an ML ensemble (LightGBM + Logistic Regression) with SHAP-based explainability, role-based access control, and interactive analytics dashboards.',
    techStack: [
      'FastAPI',
      'Next.js',
      'React',
      'TypeScript',
      'LightGBM',
      'Logistic Regression',
      'SHAP',
      'RBAC',
    ],
    date: 'Recent',
    links: [],
    images: [
      { src: '/projects/edupredict-ai-concept.svg', alt: 'AI generated concept art for EduPredict platform' },
      { src: '/projects/RP_preview.png', alt: 'EduPredict predictive analytics preview' },
    ],
    architectureImages: [
      { src: '/projects/edupredict-architecture.svg', alt: 'EduPredict architecture diagram' },
    ],
    architecture: [
      {
        layer: 'Data Layer',
        details: ['Student performance records', 'Attendance and activity streams', 'Feature preprocessing and validation'],
      },
      {
        layer: 'Intelligence Layer',
        details: ['LightGBM + Logistic Regression ensemble', 'SHAP explainability pipeline', 'Risk scoring and trend forecasting'],
      },
      {
        layer: 'Application Layer',
        details: ['FastAPI model service', 'Next.js analytics dashboards', 'Role-based educator/admin views'],
      },
    ],
  },
  {
    title: 'Smart Rural Health Assistant',
    description:
      'Developed a full-stack bilingual AI health diagnostic tool using FastAPI, Streamlit, and Scikit-learn for accessible disease prediction and severity triage in underserved rural populations.',
    techStack: [
      'Python',
      'FastAPI',
      'Streamlit',
      'Scikit-learn',
      'TF-IDF',
      'Pandas',
      'NumPy',
      'Rule-based Triage',
    ],
    date: 'Recent',
    links: [],
    images: [
      { src: '/projects/rural-health-ai-concept.svg', alt: 'AI generated concept art for rural health assistant' },
      { src: '/projects/agroai-home.png', alt: 'Health assistant home interface' },
      { src: '/projects/agroai-result.png', alt: 'Disease prediction and triage output' },
    ],
    architectureImages: [
      { src: '/projects/rural-health-architecture.svg', alt: 'Rural health assistant architecture diagram' },
    ],
    architecture: [
      {
        layer: 'Input Layer',
        details: ['Bilingual symptom text intake', 'Structured patient metadata', 'Rural accessibility-first UX'],
      },
      {
        layer: 'Decision Layer',
        details: ['NLP vectorization (TF-IDF)', 'Scikit-learn disease prediction', 'Rule-based severity triage engine'],
      },
      {
        layer: 'Care Layer',
        details: ['FastAPI inference endpoints', 'Streamlit guidance dashboard', 'Actionable triage recommendations'],
      },
    ],
  },
  {
    title: 'HoloHype - Immersive Commerce Interface',
    description:
      'Designed and developed a concept e-commerce experience focused on immersive product discovery, clean interaction design, and high-conversion flows.',
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'UI/UX Prototyping',
    ],
    date: 'Recent',
    links: [],
    images: [
      { src: '/projects/holohype-home.png', alt: 'HoloHype home page' },
      { src: '/projects/holohype-product.png', alt: 'HoloHype product view' },
      { src: '/projects/holohype-cart.png', alt: 'HoloHype cart experience' },
      { src: '/projects/holohype-login.png', alt: 'HoloHype login flow' },
    ],
    architectureImages: [],
    architecture: [
      {
        layer: 'Experience Layer',
        details: ['Interactive product storytelling', 'Responsive shopping flows', 'Conversion-optimized UI microstates'],
      },
      {
        layer: 'Frontend Layer',
        details: ['Component-driven React architecture', 'Motion-enhanced transitions', 'Tailwind utility-first styling'],
      },
      {
        layer: 'Product Layer',
        details: ['Cart and checkout touchpoints', 'Authentication entrypoints', 'Catalog-led navigation'],
      },
    ],
  },
  {
    title: 'YouTube UI Clone',
    description:
      'Built a responsive YouTube-inspired interface to practice complex layout composition, content cards, and modern frontend patterns.',
    techStack: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Responsive Design',
    ],
    date: 'Earlier',
    links: [],
    images: [
      { src: '/projects/yt-clone-preview.png', alt: 'YouTube clone preview card' },
      { src: '/projects/yt-clone-home.png', alt: 'YouTube clone homepage layout' },
    ],
    architectureImages: [],
    architecture: [
      {
        layer: 'UI Layer',
        details: ['Sidebar and feed composition', 'Card-based content grids', 'Navigation and media controls'],
      },
      {
        layer: 'State Layer',
        details: ['Reusable list rendering', 'Responsive breakpoint handling', 'Client-side interaction state'],
      },
      {
        layer: 'Design Layer',
        details: ['Visual hierarchy replication', 'Spacing/typography matching', 'Accessibility-aware color contrast'],
      },
    ],
  },
];

// --- COMPONENT & INTERFACE DEFINITIONS ---
// Define interface for project prop
interface ProjectProps {
  title: string;
}

// This component dynamically renders the project details
const ProjectContent = ({ project }: { project: ProjectProps }) => {
  // Find the matching project data from the database
  const projectData = PROJECT_CONTENT.find((p) => p.title === project.title);

  if (!projectData) {
    return <div>Project details not available</div>;
  }

  return (
    <div className="space-y-10">
      {/* Header section with description */}
      <div className="rounded-3xl bg-[#F5F5F7] p-8 dark:bg-[#1D1D1F]">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
            <span>{projectData.date}</span>
          </div>

          <p className="text-secondary-foreground font-sans text-base leading-relaxed md:text-lg">
            {projectData.description}
          </p>

          {/* Tech stack */}
          <div className="pt-4">
            <h3 className="mb-3 text-sm tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {projectData.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="rounded-full bg-neutral-200 px-3 py-1 text-sm text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Links section */}
      {projectData.links && projectData.links.length > 0 && (
        <div className="mb-24">
          <div className="px-6 mb-4 flex items-center gap-2">
            <h3 className="text-sm tracking-wide text-neutral-500 dark:text-neutral-400">
              Links
            </h3>
            <Link className="text-muted-foreground w-4" />
          </div>
          <Separator className="my-4" />
          <div className="space-y-3">
            {projectData.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#F5F5F7] flex items-center justify-between rounded-xl p-4 transition-colors hover:bg-[#E5E5E7] dark:bg-neutral-800 dark:hover:bg-neutral-700"
              >
                <span className="font-light capitalize">{link.name}</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Images gallery */}
      {projectData.images && projectData.images.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-1">
            <h3 className="text-sm tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
              Visual Gallery
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {projectData.images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-video overflow-hidden rounded-2xl"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {projectData.architecture && projectData.architecture.length > 0 && (
        <div className="space-y-6">
          <div className="mb-2 flex items-center gap-2 px-1">
            <Network className="h-4 w-4 text-neutral-500 dark:text-neutral-300" />
            <h3 className="text-sm tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
              System Architecture
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {projectData.architecture.map((block, index) => (
              <div
                key={index}
                className="rounded-2xl border border-neutral-200 bg-white/70 p-4 dark:border-neutral-700 dark:bg-neutral-900/70"
              >
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  {block.layer}
                </h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {block.details.map((detail, detailIndex) => (
                    <span
                      key={detailIndex}
                      className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                    >
                      {detail}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {projectData.architectureImages && projectData.architectureImages.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-1">
            <h3 className="text-sm tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
              Architecture Diagrams
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {projectData.architectureImages.map((image, index) => (
              <div
                key={index}
                className="relative aspect-video overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-700"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// --- MAIN DATA EXPORT ---
// This is the data used by your main portfolio page.
export const data = [
  {
    category: 'AI/ML Platform',
    title: 'EduPredict - AI Performance Analysis Platform',
    src: '/projects/edupredict-ai-concept.svg',
    content: (
      <ProjectContent project={{ title: 'EduPredict - AI Performance Analysis Platform' }} />
    ),
  },
  {
    category: 'AI for Healthcare',
    title: 'Smart Rural Health Assistant',
    src: '/projects/agroai-preview.png',
    content: (
      <ProjectContent project={{ title: 'Smart Rural Health Assistant' }} />
    ),
  },
  {
    category: 'Product Design + Frontend',
    title: 'HoloHype - Immersive Commerce Interface',
    src: '/projects/holohype-preview.png',
    content: (
      <ProjectContent project={{ title: 'HoloHype - Immersive Commerce Interface' }} />
    ),
  },
  {
    category: 'Frontend Practice',
    title: 'YouTube UI Clone',
    src: '/projects/yt-clone-preview.png',
    content: (
      <ProjectContent project={{ title: 'YouTube UI Clone' }} />
    ),
  },
];