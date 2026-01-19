import { z } from "zod";

export type ServiceOptionKey =
    | "address_reviews"
    | "auto_review_outreach"
    | "respond_feedback";

export type ServiceFieldKey =
    | "fullName"
    | "email"
    | "platformUrl"
    | "quantity"
    | "availableReviews"
    | "pricing"
    | "additionalInfo"
    | "reviewCount";

export const baseFields = {
    fullName: z.string().min(2),
    email: z.string().email(),
    platformUrl: z.string().url(),
    quantity: z.number().min(1),
    reviewCount: z.number().min(1),
    availableReviews: z.number().min(1),
    additionalInfo: z.string().optional(),
    pricing: z.number().optional(),
};

export const SERVICE_OPTIONS = [
    {
        key: "auto_review_outreach",
        title: "Auto-Review Outreach",
        fields: ["fullName", "email", "quantity", "pricing"] as const,
        price: 20,
    },
    {
        key: "address_reviews",
        title: "Address Negative or Invalid Reviews",
        fields: [
            "fullName",
            "email",
            "platformUrl",
            "quantity",
            "additionalInfo",
            "pricing",
        ] as const,
        price: 200,
    },
    {
        key: "respond_feedback",
        title: "Respond to Customer Feedback",
        fields: ["fullName", "email", "quantity", "pricing"] as const,
        price: 20,
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