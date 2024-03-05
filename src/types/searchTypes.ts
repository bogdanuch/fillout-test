export interface SearchTypes {
    limit: string;
    afterDate: string;
    beforeDate: string;
    offset: string;
    status: string;
    includeEditLink: string;
    sort: string;
    filters: string;
}

export type FilterClauseType = {
    id: string;
    condition: filerConditions;
    value: number | string;
}

export enum filerConditions {
    EQUALS = 'equals',
    DOES_NOT_EQUAL = 'does_not_equal',
    GREATER_THAN = 'greater_than',
    LESS_THAN = 'less_than',
}
