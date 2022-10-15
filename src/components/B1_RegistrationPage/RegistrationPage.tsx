import React from "react";
import style from "./RegistrationPage.module.scss"
import {IRegistrationValue, RegistrationErrorType} from "../../types/types";
import {Form, Formik, FormikHelpers, FormikProps} from "formik";
import {FieldText} from "../X_Common/FieldText/FieldText";
import {Button} from "@mui/material";
import {authApi} from "../../api/auth.api";
import { useNavigate } from "react-router-dom";

export const RegistrationPage = () => {
    const navigate = useNavigate();

    const initialValues: IRegistrationValue = {
        login: "",
        email: "",
        password: "",
    }
    const validate = (values: IRegistrationValue) => {
        const error = {} as RegistrationErrorType
        if (!values.login) {
            error.login = "required"
        }
        if (!values.email) {
            error.email = "required"
        }
        if (!values.password) {
            error.password = "required"
        }
        return error
    }

    const onSubmit = async (
        values: IRegistrationValue,
        formikHelpers: FormikHelpers<IRegistrationValue>
    ) => {
        try {
            console.log(values);
            await authApi.registration(values);
            navigate("/login");
        } catch (e: any) {
            console.log(e)
        } finally {
            formikHelpers.setSubmitting(false);
            formikHelpers.resetForm();
        }
    }

    return (
        <div className={style.registrationPage}>
            <h1>Registration</h1>

            <Formik initialValues={initialValues}
                    validate={validate}
                    onSubmit={onSubmit}
                    enableReinitialize={true}
            >
                {
                    (props: FormikProps<IRegistrationValue>) => (
                        <Form className={style.form}>
                            <FieldText name="login"
                                       label="Login"
                                       size="small"
                                       placeholder="Enter login"
                                       className={style.field}
                                       fullWidth
                            />
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
                                Registration
                            </Button>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}
