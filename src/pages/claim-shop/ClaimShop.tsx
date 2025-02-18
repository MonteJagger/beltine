import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuthContext } from "@/services/auth/AuthContext";

function ClaimShop() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const [phoneNumber, setPhoneNumber] = useState('')
    const [phoneErrorMessage, setPhoneErrorMessage] = useState('')
    const inputPhoneRef = useRef<HTMLInputElement>(null)
    
    const [shopName, setShopName] = useState('')
    const [buildingNumber, setBuildingNumber] = useState('')
    
    const [errorMessage, setErrorMessage] = useState('')
    // const { createAccount } = useAuthContext()
    const navigate = useNavigate()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        try {
            // await createAccount(email, phoneNumber, password)
            navigate('/dashboard')
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMessage(error.message)
            } else {
                setErrorMessage('An unexpected error occurred. Please try again later.')
            }
        }
    }

    function handleChangeEmail(email: string) {
        setEmail(email)
        setErrorMessage('')
    }

    function handlePhoneNumber(number: string) {
        validatePhoneNumber(number)
        const formattedNumber = formatPhoneNumber(number)
        setPhoneNumber(formattedNumber)

        // avoid cursor jumping when editing phone number
        if (inputPhoneRef.current) {
            const cursorPosition = inputPhoneRef.current.selectionStart ?? 0
            inputPhoneRef.current.value = formattedNumber
            inputPhoneRef.current?.setSelectionRange(cursorPosition, cursorPosition)
        }
    }

    /**
     * sets the error message if the phone number is invalid
     * @param number - phone number included parentheses and dashes
     */
    function validatePhoneNumber(number: string) {
        const checkString = number.replace(/[\d()-\s]/g, '') // remove digits, parentheses, and dashes
        // checks if the string contains anything other than digits, parentheses, and dashes
        if (/\D/.test(checkString)) setPhoneErrorMessage('Please enter numbers only')
        else setPhoneErrorMessage('')
    }

    /**
     * formats the number to (123) 456 - 5679
     * @param number
     */
    function formatPhoneNumber(number: string) {
        console.log('1,', number)
        if (number.length === 11) { number = number.slice(1) } // account for US country code
        console.log('2,', number)
        const digits = number.replace(/\D/g, '') // remove non digits 
        if (digits.length === 0) return ''
        else if (digits.length <= 3) return `(${digits}`
        else if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
        else if (digits.length <= 10) return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)} - ${digits.slice(6)}`
        else if (digits.length > 10) return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)} - ${digits.slice(6, 10)}`
        else return ''
    }

    return (
        <>
            <h1>Claim Retail Space</h1>
            <form className="form" onSubmit={handleSubmit}>

                {/* First Name */}
                <div className="input-group first-name">
                    <label htmlFor="first-name">First Name</label>
                    <input
                        type="text"
                        id="first-name"
                        placeholder="First Name"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        required
                        autoComplete="given-name"
                    />
                </div>

                {/* Last Name */}
                <div className="input-group last-name">
                    <label htmlFor="last-name">Last Name</label>
                    <input
                        type="text"
                        id="last-name"
                        placeholder="First Name"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        required
                        autoComplete="family-name"
                    />
                </div>

                {/* Email */}
                <div className="input-group email">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => handleChangeEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />
                </div>

                {/* Phone Number */}
                <div className="input-group phone-number">
                    <label htmlFor="tel">Phone Number</label>
                    <input
                        type="tel"
                        id="tel"
                        placeholder="(123) 456 - 7890"
                        value={phoneNumber}
                        onChange={e => handlePhoneNumber(e.target.value)}
                        required
                        autoComplete="tel"
                        ref={inputPhoneRef}
                    />
                    <div className="error-message text-red-600">{phoneErrorMessage}</div>
                </div>

                {/* Shop Name */}
                <div className="input-group shop-name">
                    <label htmlFor="shop-name">Shop Name</label>
                    <input
                        type="text"
                        id="shop-name"
                        placeholder="Shop Name"
                        value={shopName}
                        onChange={e => setShopName(e.target.value)}
                        required
                    />
                </div>

                {/* Building Number */}
                <div className="input-group building-number">
                    <label htmlFor="building-number">Building Number</label>
                    <select
                        id="building-number"
                        required
                        value={buildingNumber}
                        onChange={e => setBuildingNumber(e.target.value)}
                    >
                        {/* TODO - get list of building numbers that are available */}
                        <option value="" disabled>-- Select a Building Number --</option>
                        <option value="#600">#600</option>
                        <option value="#700">#700</option>
                        <option value="#800">#800</option>
                        <option value="#900">#900</option>
                        <option value="#1000">#1000</option>
                        <option value="not-found">Building Number Not Listed</option>
                    </select>
                </div>

                <div className="error-message text-red-600">{errorMessage}</div>

                <div className="cta-buttons">
                    <button type="submit" className="btn">Claim</button>
                </div>
            </form>
        </>
    )
}

export default ClaimShop