import Link from 'next/link'

interface Props {
  toc: { value: string; url: string; depth: number }[]
}

const TableOfContents = ({ toc }: Props) => {
  return (
    <ul className="flex flex-col justify-center gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-2">
      {toc.map(({ value, url, depth }) => (
        <li className={`flex items-center space-x-2 `} key={value}>
          <dl className="whitespace-pre text-sm font-medium leading-5">
            <dt className="sr-only">Name</dt>
            <dd className="text-gray-900 dark:text-gray-100">
              <Link
                href={url}
                className={`
                block 
                whitespace-pre-wrap 
                hover:translate-x-1 
                hover:text-primary-600 
                hover:transition-transform
                dark:hover:text-primary-400
                `}
              >
                {`${'  '.repeat(depth - 1)} ${value}`}
              </Link>
            </dd>
          </dl>
        </li>
      ))}
    </ul>
  )
}

export default TableOfContents
