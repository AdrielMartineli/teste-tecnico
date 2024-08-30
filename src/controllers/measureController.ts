import { Request, Response } from 'express';
import { processMeterImage, confirmMeasure, listCustomerMeasures } from '../services/geminiService';

export const uploadMeasure = async (req: Request, res: Response) =>  {
    try {
        const { filePath, displayName } = req.body;

        if (!filePath || !displayName) {
            return res.status(400).json({
                error_code: "INVALID_INPUT",
                error_description: "filePath and displayName are required.",
            });
        }

        const { measure_value, measure_uuid, image_url } = await processMeterImage(filePath, displayName);

        res.status(200).json({
            image_url,
            measure_value,
            measure_uuid
        });
    } catch (error: any) {
        res.status(500).json({
            error_code: "GEMINI_API_ERROR",
            error_description: error.message,
        });
    }
};

export const confirmMeasureValue = async (req: Request, res: Response) => {
    try {
        const { measure_uuid, confirmed_value } = req.body;

        if (!measure_uuid || confirmed_value === undefined) {
            return res.status(400).json({
                error_code: "INVALID_INPUT",
                error_description: "measure_uuid and confirmed_value are required.",
            });
        }

        await confirmMeasure(measure_uuid, confirmed_value);

        res.status(200).json({
            success: true
        });
    } catch (error: any) {
        res.status(error.status || 500).json({
            error_code: error.code || "CONFIRMATION_ERROR",
            error_description: error.message,
        });
    }
};

export const listCustomerMeasuresHandler = async (req: Request, res: Response) => {
    try {
        const { customer_code } = req.params;
        const { measure_type } = req.query;

        if (!customer_code) {
            return res.status(400).json({
                error_code: "INVALID_INPUT",
                error_description: "customer_code is required.",
            });
        }

        const measures = await listCustomerMeasures(customer_code, measure_type as string);

        res.status(200).json({
            customer_code,
            measures
        });
    } catch (error: any) {
        res.status(error.status || 500).json({
            error_code: error.code || "LIST_ERROR",
            error_description: error.message,
        });
    }
};
