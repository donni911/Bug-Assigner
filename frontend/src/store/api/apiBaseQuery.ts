import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/react';

import { Form } from '@savks/react-forms';
import trim from 'lodash/trim';
import { stringify } from 'qs';

import axios, { AxiosRequestConfig } from 'axios';


export type ApiBaseQueryError = {
    status?: number,
    message?: string,
    meta?: {
        response?: {
            data: any | undefined,
            statusCode: number | undefined,
            original: Response | undefined
        }
    }
};

export type ApiBaseQuery = {
    url: string,
    method: NonNullable<AxiosRequestConfig['method']>,
    data?: any | Form,
    params?: Record<string, any>,
    preloadKey?: string
};

export type ApiBaseQueryFn = BaseQueryFn<ApiBaseQuery, any, ApiBaseQueryError>;

const resolveFromServer = async (baseUrl: string | undefined, {
    url,
    method,
    data,
    params
}: ApiBaseQuery) => {
    const isForm = data instanceof Form;

    try {
        if (isForm) {
            data.markAsProcessing();
        }

        let queryParams: Record<string, any> | undefined;
        let body: Record<string, any> | undefined;

        if (method.toLowerCase() === 'get') {
            body = undefined;

        } else {
            queryParams = params;
            body = isForm ? data.requestData() : data;
        }


        const result = await axios({
            method,
            url: `${baseUrl ? `${baseUrl}/` : ''}${trim(url, '/')}`,
            data: body,
            params: queryParams,
            paramsSerializer: {
                serialize: data => stringify(data)
            }
        });

        if (isForm) {
            data.clearErrors();
        }

        return result.data

    } catch (httpError) {
        const err = httpError as any;

        if (isForm && err.response.status === 422) {
            data.setErrors(err.response.data.errors);
        }


        return {
            error: {
                status: err.response.status,
                message: err.message,
                meta: {
                    response: {
                        data: err.response.data,
                        statusCode: err.response.status,
                    }
                }
            }
        };
    } finally {
        if (isForm) {
            data.removeProcessingMark();
        }
    }
};

const apiBaseQuery = (baseUrl?: string): ApiBaseQueryFn => ({ ...args }) => {
    return resolveFromServer(baseUrl, args);
};

export default apiBaseQuery;
