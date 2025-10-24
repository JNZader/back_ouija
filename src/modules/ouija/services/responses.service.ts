import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Personality,Language,Category } from "../enums";

interface Result{
    text: string;
    matchScore: number;
    category: Category;
    method:'random';
    metadata?:{
        totalResponses?: number;
    };
}

@Injectable()
export class ResponsesService{
    private readonly logger = new Logger(ResponsesService.name);

    constructor(private readonly prisma: PrismaService){
        this.logger.log('Fallback service inicializado')
    }

    async getResponse(
        personality: Personality,
        language: Language,
        category: Category
    ): Promise<Result>{

        /**
         * busca respuestas en la base de datos
         */

        const responses= await this.prisma.fallbackResponse.findMany({
            where:{
                personality,
                language,
                category
            },
            select:{
                id:true,
                text:true,
                category:true
            },
        });

        /**
         * si no hay respuestas retorna error
         */

        if(responses.length===0){
            this.logger.warn('no encontro respuestas');
            throw new Error('no encontro respuestas');
        }

        /**
         * si hay respuestas selecciona una al azar
         */

        const randomIndex=Math.floor(Math.random()*responses.length);
        const selectedResponse=responses[randomIndex];

        /**
         * retorna la respuesta seleccionada
         */

        return{
            text: selectedResponse.text,
            matchScore: 0,
            category: selectedResponse.category as Category,
            method: 'random',
            metadata:{
                totalResponses: responses.length
            }
        }
    }
}