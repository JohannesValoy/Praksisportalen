'use server'

import DBclient from "@/knex/config/DBClient"

export async function getInternDistribution(page : int = 1, limit : int = 10, sortedBy : string = '', status : string = '' )  {
    if (page < 1) {
        throw new Error('page must be greater than 0')
    }
    if (limit < 1) {
        throw new Error('limit must be greater than 0')
    }
    if (['name', 'startDate', 'endDate', 'internship_field'].indexOf(sortedBy) === -1) {
        throw new Error('Invalid sortedBy value')
    }
    if (['Diskuteres', 'Godkjent', 'Avslått'].indexOf(status) === -1) {
        throw new Error('Invalid status value')
    }

    const query = await DBclient.select().from('internshipAgreements').where('status', status).orderBy(sortedBy)
    const response = query.slice((page - 1) * limit, page * limit)
    return response
}

export function getInternDistributionById(id) {
    return fetch(`/api/intern-distribution/${id}`)
}