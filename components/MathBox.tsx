import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const MathBox = ({ children }: Props) => (
  <div className="border border-solid border-black p-3 font-latin-roman text-base">{children}</div>
)

export default MathBox
