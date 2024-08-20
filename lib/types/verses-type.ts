type Verse = {
    id: number;
    verse_number: number;
    verse_key: string;
    hizb_number: number;
    rub_el_hizb_number: number;
    ruku_number: number;
    manzil_number: number;
    sajdah_number: number | null;
    text_uthmani: string;
    page_number: number;
    juz_number: number;
}

type Pagination = {
    per_page: number;
    current_page: number;
    next_page: number | null;
    total_pages: number;
    total_records: number;
}

type VersesResponse = {
    verses: Verse[];
    pagination: Pagination;
}

export type { Verse, Pagination, VersesResponse };