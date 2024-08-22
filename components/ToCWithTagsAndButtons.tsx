'use client'
import useMeasure from 'react-use-measure'
import Tag from './Tag'
import Link from 'next/link'

interface Props {
  tags: string[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  basePath: string
  toc: { value: string; url: string; depth: number }[]
}

const ToCWithTagsAndNavButtons = ({ tags, next, prev, basePath, toc }: Props) => {
  const [ref, { height }] = useMeasure()
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
    <>
      <dl
        ref={ref}
        className="pb-10 pt-6 xl:sticky xl:top-24 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700"
      >
        <dt className="sr-only">Authors</dt>
        <dd>
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
        </dd>
      </dl>
      <div
        className={`xl:sticky xl:col-start-1 xl:row-start-2 xl:self-start`}
        style={{ top: `calc(${height}px + 6rem)` }}
      >
        <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:divide-y">
          {tags && (
            <div className="py-4 xl:py-8">
              <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Tags
              </h2>
              <div className="flex flex-wrap">
                {tags.map((tag) => (
                  <Tag key={tag} text={tag} />
                ))}
              </div>
            </div>
          )}
          {(next || prev) && (
            <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
              {prev && prev.path && (
                <div>
                  <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Previous Article
                  </h2>
                  <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                    <Link href={`/${prev.path}`}>{prev.title}</Link>
                  </div>
                </div>
              )}
              {next && next.path && (
                <div>
                  <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Next Article
                  </h2>
                  <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                    <Link href={`/${next.path}`}>{next.title}</Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="pt-4 xl:pt-8">
          <Link
            href={`/${basePath}`}
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="Back to the blog"
          >
            &larr; Back to the blog
          </Link>
        </div>
      </div>
    </>
  )
}

export default ToCWithTagsAndNavButtons
