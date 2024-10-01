import { ChoiceIcon, PdfNoteIcon, TextRightIcon, TimeClockIcon } from '@/icons';

type StatCardProps = {
  title: string;
  value: string | number;
  description: string;
  icon: React.JSX.Element;
};

function StatCard({ title, value, description, icon }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="mb-2 flex items-start justify-between">
        <h3 className="text-xs font-semibold ">{title}</h3>
        <div className="text-neutral-500">{icon}</div>
      </div>
      <p className="mb-1 text-3xl font-bold">{value}</p>
      <p className="text-xs text-neutral-600">{description}</p>
    </div>
  );
}

export default function StatisticsPanel() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total ayah read"
        value={4421}
        description="Egestas morbi donec tempor volutpat"
        icon={<TextRightIcon className="h-6 w-6" />}
      />
      <StatCard
        title="Minutes spent"
        value="2h 34m"
        description="Arcu pretium ac ut lobortis"
        icon={<TimeClockIcon className="h-6 w-6" />}
      />
      <StatCard
        title="Quiz score"
        value={83.4}
        description="Sed sit nullam sem aliquam"
        icon={<ChoiceIcon className="h-6 w-6" />}
      />
      <StatCard
        title="Leaderboard"
        value="53rd"
        description="Amet aliquam pharetra euismod gravida"
        icon={<PdfNoteIcon className="h-6 w-6" />}
      />
    </div>
  );
}
