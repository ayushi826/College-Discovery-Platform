interface Props {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  return (
    <div className="mt-10 flex items-center justify-center gap-3">
      {Array.from({
        length: totalPages,
      }).map((_, index) => (
        <button
          key={index}
          onClick={() =>
            onPageChange(index + 1)
          }
          className={`rounded-xl px-4 py-2 ${
            currentPage === index + 1
              ? 'bg-black text-white'
              : 'border bg-white'
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  )
}

export default Pagination