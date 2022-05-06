import { render, screen } from '@testing-library/react'
import * as List from '.'

describe('<List />', () => {
  it('should render correctly', () => {
    const { container } = render(
      <List.Root>
        <List.Item href="/item1" isActive>
          Item 1
        </List.Item>
        <List.Item href="/item2">Item 2</List.Item>
      </List.Root>
    )

    const link1 = screen.getByRole('link', { name: 'Item 1' })
    const link2 = screen.getByRole('link', { name: 'Item 2' })

    expect(link1).toBeInTheDocument()
    expect(link1).toHaveClass('bg-mauve5', 'dark:bg-mauveDark5')
    expect(link1).toHaveAttribute('href', '/item1')

    expect(link2).toBeInTheDocument()
    expect(link2).toHaveClass('hover:bg-mauve4', 'dark:hover:bg-mauveDark4')
    expect(link2).toHaveAttribute('href', '/item2')

    expect(container.firstChild).toMatchSnapshot()
  })
})
