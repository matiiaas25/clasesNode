const z = require('zod')

const movieSchema = z.object ({ // validaciones con zod
    title: z.string({
        invalid_type_error: 'Movie title must be a string',
        required_error: 'Movie title is required'
    }),
    year: z.number().int().positive().min(1900).max(2024),
    director: z.string(),
    duration: z.number().int().positive(),
    poster: z.string().url({
        message: 'Poster must be a valid url'
    }),
    genre: z.array(
        z.enum(['Terror', 'Action', 'Sci-Fi', 'Comedy', 'Drama'])
    ), 
    rate: z.number().min(0).max(10).default(5)
})

function validateMovie (object) {
    return movieSchema.safeParse(object)
}

function validatePartialMovie (object) {
    return movieSchema.partial().safeParse(object) //partial hace que cada una de las validaciones del zod son opcionales
}

module.exports = {
    validateMovie,
    validatePartialMovie
}