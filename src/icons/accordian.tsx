interface AccordionProps {
    variant?: "open" | "close";
    className?: string;
}

export function AccordionIcon({ variant, className }: AccordionProps) {
    return variant === "close" ? (
        <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.180571 0.26192C0.450138 -0.0525743 0.923613 -0.0889955 1.23811 0.180571L7.75001 5.76221L14.2619 0.180572C14.5764 -0.0889949 15.0499 -0.0525737 15.3195 0.261921C15.589 0.576415 15.5526 1.04989 15.2381 1.31946L8.23811 7.31946C7.95724 7.5602 7.54279 7.5602 7.26192 7.31946L0.26192 1.31946C-0.0525743 1.04989 -0.0889955 0.576414 0.180571 0.26192Z" fill="#333333" />
        </svg>

    ) : (
        <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M15.3194 7.23808C15.0499 7.55257 14.5764 7.589 14.2619 7.31943L7.74999 1.73779L1.23808 7.31943C0.923586 7.58899 0.45011 7.55257 0.180544 7.23808C-0.0890226 6.92358 -0.0526009 6.45011 0.261893 6.18054L7.26189 0.180544C7.54276 -0.0601997 7.95721 -0.0601997 8.23808 0.180544L15.2381 6.18054C15.5526 6.45011 15.589 6.92359 15.3194 7.23808Z" fill="#333333" />
        </svg>

    );
}
