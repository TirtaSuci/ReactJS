import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LoginView from '@/view/auth/login'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'

// Mock router & signIn
jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}))

jest.mock('next-auth/react', () => ({
    signIn: jest.fn(),
}))

describe('LoginView', () => {
    const push = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()

            ; (useRouter as jest.Mock).mockReturnValue({
                push,
                query: {},
            })
    })

    it('renders login page title', () => {
        render(<LoginView />)
        expect(screen.getByText('Login Page')).toBeInTheDocument()
    })

    it('shows error message when signIn fails', async () => {
        ;(signIn as jest.Mock).mockResolvedValue({ error: 'Invalid credentials' })
    
        render(<LoginView />)
    
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'test@example.com' },
        })
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: 'wrongpassword' },
        })
    
        // Gunakan getByTestId
        fireEvent.click(screen.getByTestId('login-submit'))
    
        await waitFor(() =>
            expect(
                screen.getByText(/email or password is incorrect/i),
            ).toBeInTheDocument(),
        )
    })
    
    

    // it('redirects to callbackUrl if login is successful', async () => {
    //     ; (signIn as jest.Mock).mockResolvedValue({ error: null })

    //     render(<LoginView />)

    //     fireEvent.change(screen.getByLabelText(/email/i), {
    //         target: { value: 'test@example.com' },
    //     })
    //     fireEvent.change(screen.getByLabelText(/password/i), {
    //         target: { value: 'password123' },
    //     })

    //     fireEvent.click(screen.getByRole('button', { name: /login/i }))

    //     await waitFor(() => expect(push).toHaveBeenCalledWith('/'))
    // })
})
