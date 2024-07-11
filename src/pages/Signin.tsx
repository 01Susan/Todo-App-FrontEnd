/* eslint-disable @typescript-eslint/no-explicit-any */
import InputField from "../components/InputField"
import MainButton from "../components/MainButton"
import PasswordInputField from "../components/PasswordInputField"
import { useState, useCallback, ChangeEvent } from "react"
import axios, { AxiosError } from "axios"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export function Signin() {
    const navigate = useNavigate()
    const { login } = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [globalError, setGlobalError] = useState<string>("")
    const [validationError, setValidationErrors] = useState<FormErrors>({})
    const [success, setGlobalSuccess] = useState<string>("")

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


    const handleSubmit = useCallback(async () => {
        setLoading(true);
        setGlobalError("");
        setGlobalSuccess("");
        setValidationErrors({});
        const data = {
            email: email,
            password: password
        }
        try {
            const response = await axios.post(`${BaseURL}/user/signin`, data);
            setGlobalError("");
            setValidationErrors({});
            setGlobalSuccess(response.data.message);
            setLoading(false);
            const token = response.data.data;
            localStorage.setItem('token', token);
            login({ token })
            navigate('/dashboard');
        } catch (error: any) {
            setLoading(false);
            console.log(error);

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
                    } else {
                        setGlobalError(axiosError.response?.data.message);
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
        } finally {
            setEmail("");
            setPassword("");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email, password]);

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
                    <h1 className="text-4xl text-purple text-center"> Singin </h1>
                    {success && <p className="text-green-500">{success}</p>}
                    {globalError && <p className="text-red-500">{globalError}</p>}
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
                        label="Signin"
                        onclick={handleSubmit}
                        disabled={loading}
                        loading={loading} />
                    <span className="text-center">Don't have an account? <Link className="text-purple" to="/signup">Signup</Link></span>
                </div>
            </div>
        </>
    )














}