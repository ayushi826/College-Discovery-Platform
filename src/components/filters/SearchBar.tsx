interface Props {
  value: string
  onChange: (value: string) => void
}

const SearchBar = ({
  value,
  onChange,
}: Props) => {
  return (
    <input
      type="text"
      placeholder="Search colleges..."
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="w-full rounded-2xl border bg-white px-5 py-4 outline-none"
    />
  )
}

export default SearchBar