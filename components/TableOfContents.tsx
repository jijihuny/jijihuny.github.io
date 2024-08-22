import Link from 'next/link'

interface Props {
  toc: { value: string; url: string; depth: number }[]
}

const TableOfContents = ({ toc }: Props) => {
  const index = [0, 1, 1, 1, 1, 1]
  let prev_depth = 0
  const getIndex = (depth: number) => {
    if (prev_depth >= depth) {
      index[depth]++
      index.forEach((val, i) => {
        if (i > depth) {
          index[i] = 1
        }
      })
    }
    prev_depth = depth
    const result = index.slice(0, depth + 1).join('.')
    return result
  }

  return (
    <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-2">
      {toc.map(({ value, url, depth }) => (
        <li className="flex items-center space-x-2" key={value}>
          <dl className="whitespace-pre text-sm font-medium leading-5">
            <dt className="sr-only">Name</dt>
            <dd className="text-gray-900 dark:text-gray-100">
              <Link href={url} className="hover:text-primary-600 dark:hover:text-primary-400">
                {`${'  '.repeat(depth - 1)}${getIndex(depth - 1)}. ${value}`}
              </Link>
            </dd>
          </dl>
        </li>
      ))}
    </ul>
  )
}

export default TableOfContents
