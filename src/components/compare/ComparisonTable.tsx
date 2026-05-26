import { College } from '@/types'

interface Props {
  colleges: College[]
}

const ComparisonTable = ({
  colleges,
}: Props) => {
  return (
    <div className="overflow-x-auto rounded-3xl border bg-white">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="border-b bg-gray-50 text-left">
            <th className="p-5">College</th>
            <th className="p-5">Fees</th>
            <th className="p-5">Rating</th>
            <th className="p-5">
              Avg Package
            </th>
            <th className="p-5">
              Placement Rate
            </th>
          </tr>
        </thead>

        <tbody>
          {colleges.map((college) => (
            <tr
              key={college.id}
              className="border-b"
            >
              <td className="p-5 font-medium">
                {college.name}
              </td>

              <td className="p-5">
                ₹{college.fees.min}L - ₹
                {college.fees.max}L
              </td>

              <td className="p-5">
                ⭐ {college.rating}
              </td>

              <td className="p-5">
                ₹{college.avgPackage} LPA
              </td>

              <td className="p-5">
                {college.placementRate}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ComparisonTable