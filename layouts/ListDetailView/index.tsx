type ListDetailViewProps = {
  list: React.ReactElement | null
  detail?: React.ReactElement | null
  hasDetail?: boolean
}

export const ListDetailView = ({ list, detail = null, hasDetail = false }: ListDetailViewProps) => {
  return (
    <div className="flex w-full">
      {list && <div className={hasDetail ? 'hidden md:flex' : 'w-full min-h-screen'}>{list}</div>}
      {detail}
    </div>
  )
}
