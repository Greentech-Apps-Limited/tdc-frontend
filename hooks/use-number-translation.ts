import { useTranslations } from 'next-intl';
export function useNumberTranslation() {
    const t = useTranslations('Numbers');
    const translateNumber = (num: number | string): string => {
        return num.toString().split('').map(digit => t(`digit.${digit}`)).join('');
    };
    return translateNumber;
}