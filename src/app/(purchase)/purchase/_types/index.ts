import { z } from "zod";

export type ServiceOptionKey =
    | "address_reviews"
    | "auto_review_outreach"
    | "respond_feedback";

export type ServiceFieldKey =
    | "fullName"
    | "email"
    | "phoneNumber"
    | "platformUrl"
    | "duration"
    | "quantity"
    | "availableReviews"
    | "pricing"
    | "additionalInfo"
    | "reviewCount";

export const baseFields = {
    fullName: z.string().min(2),
    email: z.string().email(),
    phoneNumber: z.number().min(8),
    platformUrl: z.string().url(),
    quantity: z.number().min(1),
    reviewCount: z.number().min(1),
    duration: z.string(),
    availableReviews: z.number().min(1),
    additionalInfo: z.string().optional(),
    pricing: z.number().optional(),
};

export const SERVICE_OPTIONS = [
    {
        key: "auto_review_outreach",
        title: "Get More Reviews",
        fields: ["fullName", "email", "phoneNumber", "platformUrl", "quantity", "additionalInfo", "pricing",] as const,
        price: 50,
    },
    {
        key: "address_reviews",
        title: "Dispute Negative/Invalid Reviews",
        fields: [
            "fullName",
            "email",
            "phoneNumber",
            "platformUrl",
            "quantity",
            "additionalInfo",
            "pricing",
        ] as const,
        price: 100,
    },
    {
        key: "respond_feedback",
        title: "Respond to Customer Feedback",
        fields: ["fullName", "email", "phoneNumber", "platformUrl", "duration", "additionalInfo", "pricing"] as const,
        price: 500,
    },
] as const;

const createServiceOptionSchema = (fields: readonly (keyof typeof baseFields)[]) => {
    const schemaShape: Record<string, z.ZodTypeAny> = {};
    fields.forEach((field) => {
        schemaShape[field] = baseFields[field].optional();
    });
    return z.object(schemaShape);
};

const dataSchemaShape: Record<string, z.ZodTypeAny> = {};
SERVICE_OPTIONS.forEach((option) => {
    dataSchemaShape[option.key] = createServiceOptionSchema(option.fields);
});

export const formSchema = z.object({
    service: z.string(),
    option: z.enum(["address_reviews", "auto_review_outreach", "respond_feedback"]),
    data: z.object(dataSchemaShape),
}).refine((data) => {
    // Only validate the selected option
    const selectedOption = data.option;
    const selectedData = data.data[selectedOption];

    if (!selectedData) return false;

    // Validate based on which option is selected
    if (selectedOption === "auto_review_outreach") {
        return !!(
            selectedData.fullName &&
            selectedData.fullName.length >= 2 &&
            selectedData.email &&
            selectedData.email.includes("@") &&
            selectedData.quantity &&
            selectedData.quantity >= 1
        );
    }

    if (selectedOption === "address_reviews") {
        return !!(
            selectedData.fullName &&
            selectedData.fullName.length >= 2 &&
            selectedData.email &&
            selectedData.email.includes("@") &&
            selectedData.platformUrl &&
            selectedData.platformUrl.startsWith("http") &&
            selectedData.quantity &&
            selectedData.quantity >= 1
        );
    }

    if (selectedOption === "respond_feedback") {
        return !!(
            selectedData.fullName &&
            selectedData.fullName.length >= 2 &&
            selectedData.email &&
            selectedData.email.includes("@") &&
            selectedData.quantity &&
            selectedData.quantity >= 1
        );
    }

    return false;
}, {
    message: "Please fill all required fields for the selected option",
});

export type FormSchemaType = z.infer<typeof formSchema>;