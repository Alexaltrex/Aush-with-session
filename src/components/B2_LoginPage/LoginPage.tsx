import React from "react";
import style from "./LoginPage.module.scss"
import {LoginErrorType, LoginValueType} from "../../types/types";
import {Form, Formik, FormikHelpers, FormikProps} from "formik";
import {FieldText} from "../X_Common/FieldText/FieldText";
import {Button} from "@mui/material";
import {authApi} from "../../api/auth.api";
import {observer} from "mobx-react-lite";
import {useStore} from "../../store/useStore";
import {useNavigate} from "react-router-dom";

export const LoginPage = observer(() => {
    const navigate = useNavigate();

    const {authStore: {setUserInfo, setAuth}} = useStore()

    const initialValues: LoginValueType = {
        email: "",
        password: "",
    }
    const validate = (values: LoginValueType) => {
        const error = {} as LoginErrorType
        if (!values.email) {
            error.email = "required"
        }
        if (!values.password) {
            error.password = "required"
        }
        return error
    }

    const onSubmit = async (
        values: LoginValueType,
        formikHelpers: FormikHelpers<LoginValueType>
    ) => {
        try {
            console.log(values)
            await authApi.login(values);
            const response = await authApi.userInfo()
            setUserInfo(response.data);
            setAuth(true);
            navigate("/");
        } catch (e: any) {
            console.log(e)
        } finally {
            formikHelpers.setSubmitting(false);
            formikHelpers.resetForm();
        }
    }

    return (
        <div className={style.loginPage}>
            <h1>Login</h1>

            <Formik initialValues={initialValues}
                    validate={validate}
                    onSubmit={onSubmit}
                    enableReinitialize={true}
            >
                {
                    (props: FormikProps<LoginValueType>) => (
                        <Form className={style.form}>
                            <FieldText name="email"
                                       label="Email"
                                       size="small"
                                       type="email"
                                       placeholder="Enter email"
                                       className={style.field}
                                       fullWidth
                            />
                            <FieldText name="password"
                                       label="Password"
                                       size="small"
                                       type="password"
                                       placeholder="Enter password"
                                       className={style.field}
                                       fullWidth
                            />
                            <Button color="primary"
                                    variant="contained"
                                    fullWidth
                                    type="submit"
                                    size="small"
                                    className={style.btn}
                            >
                                Login
                            </Button>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
})
