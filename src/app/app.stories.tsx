import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bell, Calendar, CircleHelp, CreditCard, Download, FileText, LayoutGrid, Link2, List, Play, Shield, Users } from 'lucide-react'
import { useState } from 'react'
import { type RunStatus, StatusBadge } from '../status'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Button, DropdownMenuItem, Field, Input, Pagination, Progress, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Switch, Tabs, TabsList, TabsTrigger, Label, ToggleGroup, ToggleGroupItem } from '../ui'
import { AppShell, type AppNavItem } from './app-shell.component'
import { FilterBar, FilterChip } from './filter-bar.component'
import { FormSection } from './form-section.component'
import { PageHeader } from './page-header.component'
import { type RecordsColumn, RecordsTable } from './records-table.component'
import { StatCard } from './stat-card.component'

const meta = {
  title:      'App/Patterns',
  parameters: { density: 'app' },
  globals:    { product: 'pargic' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

interface Run { id: string, recipe: string, status: RunStatus, records: string, duration: string, started: string }

const RUNS: Run[] = [
  { id: '2026-11-27-1', recipe: 'Supplier invoices', status: 'completed', records: '412', duration: '1m 38s', started: 'Today 07:00' },
  { id: '2026-11-27-2', recipe: 'Price list, EU', status: 'running', records: '96', duration: '0m 41s', started: 'Today 08:30' },
  { id: '2026-11-26-4', recipe: 'Tender notices', status: 'failed', records: '0', duration: '0m 12s', started: 'Yesterday 18:00' },
  { id: '2026-11-26-3', recipe: 'Supplier invoices', status: 'completed', records: '388', duration: '1m 44s', started: 'Yesterday 07:00' },
  { id: '2026-11-26-2', recipe: 'Contract PDFs', status: 'no-records', records: '0', duration: '2m 05s', started: 'Yesterday 06:00' },
  { id: '2026-11-28-1', recipe: 'Supplier invoices', status: 'queued', records: '—', duration: '—', started: 'Tomorrow 07:00' },
]

const COLUMNS: RecordsColumn<Run>[] = [
  { key: 'id', header: 'Run', cell: (run) => <span className='font-mono text-xs'>{run.id}</span> },
  { key: 'recipe', header: 'Recipe', cell: (run) => <span className='font-medium'>{run.recipe}</span> },
  { key: 'status', header: 'Status', cell: (run) => <StatusBadge status={run.status} /> },
  { key: 'records', header: 'Records', cell: (run) => run.records, align: 'end' },
  { key: 'duration', header: 'Duration', cell: (run) => <span className='text-muted-foreground'>{run.duration}</span>, align: 'end' },
  { key: 'started', header: 'Started', cell: (run) => <span className='whitespace-nowrap text-muted-foreground'>{run.started}</span> },
]

const NAV: AppNavItem[] = [
  { label: 'Overview', href: '#overview', icon: <LayoutGrid /> },
  { label: 'Recipes', href: '#recipes', icon: <FileText />, count: 12 },
  { label: 'Runs', href: '#runs', icon: <Play />, current: true },
  { label: 'Records', href: '#records', icon: <List /> },
  { label: 'Schedules', href: '#schedules', icon: <Calendar />, count: 4 },
  { label: 'Connections', href: '#connections', icon: <Link2 /> },
]

const SETTINGS_NAV = { title: 'Workspace', items: [{ label: 'Members', href: '#members', icon: <Users /> }, { label: 'Access', href: '#access', icon: <Shield /> }, { label: 'Billing', href: '#billing', icon: <CreditCard /> }] }

const STATS = (
  <div className='grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3'>
    <StatCard label='Runs, 7 days' value='214' delta='+12 vs last week' tone='positive' series={[3, 4, 3.5, 5, 6, 5.5, 7]} />
    <StatCard label='Records delivered' value='48,920' delta='+8.2%' tone='positive' series={[2, 3.5, 3, 5, 4.5, 7, 8]} />
    <StatCard label='Failed runs' value='3' delta='2 need attention' tone='negative' series={[1, 0.5, 2, 1, 3, 1, 1.5]} />
    <StatCard label='Median duration' value='1m 42s' delta='−9s' tone='positive' series={[6, 5, 5.5, 4.5, 5, 4, 4.2]} />
  </div>
)

/**
 * The runs table with search, filters and selection, as a component for the stories.
 *
 * @returns The table card.
 */
function RunsTable () {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Set<string>>(() => new Set(['2026-11-27-1', '2026-11-26-4']))
  const [page, setPage] = useState(1)
  const rows = RUNS.filter((run) => run.recipe.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className='overflow-hidden rounded-xl border bg-card shadow-xs'>
      <FilterBar
        query={query}
        onQueryChange={setQuery}
        searchLabel='Search runs'
        filters={<><FilterChip label='Status' count={2} /><FilterChip label='Last 7 days' icon={<Calendar />} /></>}
        views={(
          <ToggleGroup type='single' defaultValue='all' aria-label='Run kind'>
            <ToggleGroupItem value='all'>All</ToggleGroupItem>
            <ToggleGroupItem value='scheduled'>Scheduled</ToggleGroupItem>
            <ToggleGroupItem value='manual'>Manual</ToggleGroupItem>
          </ToggleGroup>
        )}
      />
      <RecordsTable
        label='Runs'
        rows={rows}
        columns={COLUMNS}
        getRowId={(run) => run.id}
        selected={selected}
        onSelectedChange={setSelected}
        rowActions={() => <><DropdownMenuItem>Open run</DropdownMenuItem><DropdownMenuItem>Run again</DropdownMenuItem><DropdownMenuItem variant='destructive'>Delete run</DropdownMenuItem></>}
      />
      <div className='flex flex-wrap items-center gap-2 px-3 py-2.5'>
        <span className='text-[13px] text-muted-foreground'>{selected.size} selected · 128 runs</span>
        <Pagination className='ms-auto' page={page} pageCount={16} onPageChange={setPage} />
      </div>
    </div>
  )
}

/** Stat cards with brand sparklines. */
export const Stats: Story = { render: () => STATS }

/** The page header, with actions and section tabs. */
export const Header: Story = {
  render: () => (
    <PageHeader
      title='Runs'
      description='Every run of every recipe in this project.'
      actions={<><Button variant='outline'><Download />Export</Button><Button><Play />Run now</Button></>}
      tabs={<Tabs defaultValue='all'><TabsList variant='underline'><TabsTrigger value='all'>All runs</TabsTrigger><TabsTrigger value='failed'>Failed</TabsTrigger></TabsList></Tabs>}
    />
  ),
}

/** The records table with its filter bar and pagination. */
export const Records: Story = { render: () => <RunsTable /> }

/** A settings section. */
export const Settings: Story = {
  render: () => (
    <FormSection title='Notifications' description='Who hears about failed runs, and how.' actions={<><Button variant='outline'>Cancel</Button><Button>Save</Button></>}>
      <Field label='Alert email' hint='One address per line.'><Input defaultValue='ops@acme.example' /></Field>
      <Field label='Channel'>
        <Select defaultValue='email'>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value='email'>Email</SelectItem><SelectItem value='teams'>Microsoft Teams</SelectItem><SelectItem value='slack'>Slack</SelectItem></SelectContent>
        </Select>
      </Field>
      <Label className='justify-between'>Notify on failure<Switch defaultChecked /></Label>
    </FormSection>
  ),
}

/** The whole portal page: shell, header, stats and the runs table. Press ⌘K or Ctrl K for the palette. */
export const Portal: Story = {
  parameters: { layout: 'fullscreen' },
  render:     () => (
    <AppShell
      product='pargic'
      workspace='Acme Finance workspace'
      nav={NAV}
      secondaryNav={SETTINGS_NAV}
      user={{ name: 'Ed R.', role: 'Owner', initials: 'ER' }}
      sidebarFooter={(
        <div className='flex flex-col gap-2 rounded-xl border bg-card p-3'>
          <span className='text-[13px] font-semibold'>Runs this month</span>
          <Progress value={62} aria-label='Runs this month' />
          <span className='text-xs text-muted-foreground tabular-nums'>1,860 of 3,000 included</span>
        </div>
      )}
      breadcrumb={(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href='#'>Supplier invoices</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Runs</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )}
      topActions={<><Button variant='ghost' size='icon' aria-label='Notifications'><Bell /></Button><Button variant='ghost' size='icon' aria-label='Help'><CircleHelp /></Button></>}
      commands={[
        { label: 'Supplier invoices', group: 'Recipes', onSelect: () => {} },
        { label: 'Price list, EU', group: 'Recipes', onSelect: () => {} },
        { label: 'New recipe', group: 'Actions', onSelect: () => {} },
        { label: 'Run now', group: 'Actions', onSelect: () => {} },
      ]}
    >
      <PageHeader title='Runs' description='Every run of every recipe in this project.' actions={<><Button variant='outline'><Download />Export</Button><Button><Play />Run now</Button></>} />
      {STATS}
      <RunsTable />
    </AppShell>
  ),
}
