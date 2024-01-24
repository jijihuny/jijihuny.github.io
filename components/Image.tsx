import NextImage, { ImageProps } from 'next/image'

const Image = ({ src, ...rest }: ImageProps) => (
  <NextImage src={`/jijihuny.github.io${src}`} {...rest} />
)

export default Image
