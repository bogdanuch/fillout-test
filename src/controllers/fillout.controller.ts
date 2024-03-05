import {Request, Response} from "express";
import axios from "axios";

import config from "../config";
import {filerConditions, FilterClauseType, SearchTypes} from "../types";

export const getFormData = async (req: Request<any, any, any, SearchTypes>, res: Response) => {
    const {formId} = req.params;
    const params = req.query;
    const filters: FilterClauseType[] = JSON.parse(params.filters);
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.filloutApiKey}`
    };
    try {
        const {data} = await axios.get(
            `https://api.fillout.com/v1/api/forms/${formId}/submissions`,
            {headers, params}
        );
        const filteredResult = await filterResponses(data, filters)
        return res.status(200).send(
            {
                responses: filteredResult,
                totalResponses: filteredResult.length,    //Not sure if I'm supposed to return initial amount of responses or after filtering, but I doubt I'm supposed to request everything and implement my own pagination
                pageCount: data.pageCount
            }
        )
    } catch (e: any) {
        console.log(e);
        throw new Error(e);
    }
}

const filterResponses = async (data: any, filters: FilterClauseType[]) => {
    let result = data.responses;
    filters.forEach((filter) => {
        result = result.filter((resp: any)=> {
            for(let i= 0; i < resp.questions.length; i++) {
                const currentQuestion = resp.questions[i];
                if(currentQuestion.id === filter.id) {
                    if(currentQuestion.value === null) { return false }              //not sure what I'm supposed to do
                    return checkByFilterCondition(currentQuestion, filter);
                }
            }
            return false;
        })
    })

    return result;
}

const checkByFilterCondition = (question: any, filter: FilterClauseType) => {
    if(question.type === "DatePicker") {
        const questionDate = new Date(question.value)
        const filterDate = new Date(filter.value)
        return conditionChecker(questionDate.getTime(), filterDate.getTime(), filter.condition)
    }
    return conditionChecker(question.value, filter.value, filter.condition)
}

const conditionChecker = (
    questionValue: string | number | Date,
    filterValue: string | number | Date,
    condition: filerConditions
) => {
    switch (condition) {
        case filerConditions.EQUALS:
            return questionValue === filterValue;
        case filerConditions.DOES_NOT_EQUAL:
            return questionValue != filterValue;
        case filerConditions.GREATER_THAN:
            return questionValue > filterValue;
        case filerConditions.LESS_THAN:
            return questionValue < filterValue;
        default:
            return false;
    }
}
