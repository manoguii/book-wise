import { Icons } from './icons'
import { Badge } from './ui/badge'
import { Card, CardContent, CardHeader, CardDescription } from './ui/card'
import { Skeleton } from './ui/skeleton'

interface MetricCardProps {
  title: string
  value: string | number
  badge?: string
  icon: keyof typeof Icons
}

export function MetricCard({ title, value, icon, badge }: MetricCardProps) {
  const Icon = Icons[icon]
  return (
    <Card className="w-full">
      <CardHeader>
        <Icon className="h-7 w-7 text-muted-foreground" />
      </CardHeader>

      <CardContent>
        <CardDescription>{title}</CardDescription>
        <div className="mt-2 flex items-center justify-between gap-4">
          <div className="truncate text-2xl font-bold">{value}</div>
          {badge && <Badge className="mt-3">{badge}</Badge>}
        </div>
      </CardContent>
    </Card>
  )
}

MetricCard.Skeleton = function MetricCardSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader>
        <Skeleton className="h-7 w-7" />
      </CardHeader>

      <CardContent className="mt-2">
        <CardDescription>
          <Skeleton className="h-3 w-20" />
        </CardDescription>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
      </CardContent>
    </Card>
  )
}
