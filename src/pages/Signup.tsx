/* eslint-disable @typescript-eslint/no-explicit-any */
import InputField from "../components/InputField"
import MainButton from "../components/MainButton"
import PasswordInputField from "../components/PasswordInputField"
import { useState, useCallback, ChangeEvent } from "react"
import axios, { AxiosError } from "axios"
import { useNavigate, Link } from "react-router-dom"



export function Signup() {
    const navigate = useNavigate()

    interface Issue {
        code?: string;
        validation?: string;
        message: string;
        path: string[];
    }

    interface ErrorData {
        issues: Issue[];
        name: string;
    }
    interface FormErrors {
        fullName?: string;
        email?: string;
        password?: string;
    }
    const BaseURL = import.meta.env.VITE_BASE_URL_DEV;
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [validationError, setValidationErrors] = useState<FormErrors>({})
    const [loading, setLoading] = useState(false);
    const [globalError, setGlobalError] = useState<string>("")
    const [success, setGlobalSuccess] = useState<string>("")

    const handleSubmit = useCallback(async () => {
        setLoading(true);
        const data = {
            fullName: username,
            email: email,
            password: password
        }
        try {
            const response = await axios.post(`${BaseURL}/user/signup`, data);
            setEmail("");
            setPassword("");
            setUsername("");
            setGlobalError("");
            setValidationErrors({});
            setGlobalSuccess(response.data.message);
            setLoading(false);
            navigate('/signin');
        } catch (error: any) {
            setLoading(false);
            if (error instanceof AxiosError) {
                const axiosError = error as AxiosError<any>;
                if (axiosError.response && axiosError.response.data && axiosError.response.data.error) {
                    const errorData: ErrorData = axiosError.response.data.error;

                    if (errorData.name === 'ZodError' && errorData.issues) {
                        // Handle Zod validation errors
                        const zodErrors = errorData.issues.reduce((acc, issue) => {
                            acc[issue.path[0]] = issue.message;
                            return acc;
                        }, {} as { [Key: string]: string });
                        setGlobalError("");
                        setGlobalSuccess("");
                        setValidationErrors(zodErrors);
                    }
                } else {
                    // Handle other Axios errors with a global message
                    setGlobalSuccess("");
                    setValidationErrors({});
                    setGlobalError(axiosError.response?.data.message);
                }
            } else {
                // Handle non-Axios errors (e.g., network error, JavaScript error)
                setGlobalError(error.message);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username, email, password]);
    console.log(globalError);


    const handleUsernameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }, []);

    const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }, []);

    const handlePasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }, []);
    return (
        <>
            <div className="flex justify-center items-center w-full h-screen bg-purple">
                <div className="bg-white w-1/3 h-auto flex flex-col gap-5 rounded-md shadow-2xl p-10">
                    <h1 className="text-4xl text-purple text-center"> Singup </h1>
                    {success && <p className="text-green-500">{success}</p>}
                    {globalError && <p className="text-red-500">{globalError}</p>}
                    <InputField
                        label="Username"
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Please Enter Username"
                        value={username}
                        onchange={handleUsernameChange}
                    />
                    {validationError.fullName && <p className="text-red-500">{validationError.fullName}</p>}
                    <InputField
                        label="Email"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Please Enter Email Address"
                        value={email}
                        onchange={handleEmailChange}
                    />
                    {validationError.email && <p className="text-red-500">{validationError.email}</p>}
                    <PasswordInputField
                        label="Password"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Please Enter Password"
                        value={password}
                        onchange={handlePasswordChange}
                    />
                    {validationError.password && <p className="text-red-500">{validationError.password}</p>}
                    <MainButton
                        label="Signup"
                        onclick={handleSubmit}
                        disabled={loading}
                        loading={loading} />
                    <span className="text-center">Already have an account? <Link className="text-purple" to="/signin">Signin</Link></span>
                </div>
            </div>
        </>
    )
}