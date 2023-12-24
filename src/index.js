import combining from './combining.js';

function binarySearch(ucs) {
    return combining.some(([start, end]) => ucs >= start && ucs <= end);
}

/**
 * The following two functions define the column width of an ISO 10646
 * character as follows:
 *    - The null character (U+0000) has a column width of 0.
 *    - Other C0/C1 control characters and DEL will lead to a return
 *      value of -1.
 *    - Non-spacing and enclosing combining characters (general
 *      category code Mn or Me in the Unicode database) have a
 *      column width of 0.
 *    - SOFT HYPHEN (U+00AD) has a column width of 1.
 *    - Other format characters (general category code Cf in the Unicode
 *      database) and ZERO WIDTH SPACE (U+200B) have a column width of 0.
 *    - Hangul Jamo medial vowels and final consonants (U+1160-U+11FF)
 *      have a column width of 0.
 *    - Spacing characters in the East Asian Wide (W) or East Asian
 *      Full-width (F) category as defined in Unicode Technical
 *      Report #11 have a column width of 2.
 *    - All remaining characters (including all printable
 *      ISO 8859-1 and WGL4 characters, Unicode control characters,
 *      etc.) have a column width of 1.
 * This implementation assumes that wchar_t characters are encoded
 * in ISO 10646.
 */

function wcwidth(ucs) {
    // test for 8-bit control characters
    if (ucs === 0) return 0;
    if (ucs < 32 || (ucs >= 0x7F && ucs < 0xA0)) return -1;

    // binary search in table of non-spacing characters
    if (binarySearch(ucs)) return 0;

    // if we arrive here, ucs is not a combining or C0/C1 control character
    return 1 +
        (ucs >= 0x11_00 &&
        (ucs <= 0x11_5F ||                    /* Hangul Jamo init. consonants */
        ucs === 0x23_29 || ucs === 0x23_2A ||
        (ucs >= 0x2E_80 && ucs <= 0xA4_CF &&
         ucs !== 0x30_3F) ||                  /* CJK ... Yi */
        (ucs >= 0xAC_00 && ucs <= 0xD7_A3) || /* Hangul Syllables */
        (ucs >= 0xF9_00 && ucs <= 0xFA_FF) || /* CJK Compatibility Ideographs */
        (ucs >= 0xFE_10 && ucs <= 0xFE_19) || /* Vertical forms */
        (ucs >= 0xFE_30 && ucs <= 0xFE_6F) || /* CJK Compatibility Forms */
        (ucs >= 0xFF_00 && ucs <= 0xFF_60) || /* Fullwidth Forms */
        (ucs >= 0xFF_E0 && ucs <= 0xFF_E6) ||
        (ucs >= 0x2_00_00 && ucs <= 0x2_FF_FD) ||
        (ucs >= 0x3_00_00 && ucs <= 0x3_FF_FD)));
}

function wcswidth(str) {
    let w, width = 0;

    for (let i = 0; i < str.length; i++) {
        if ((w = wcwidth(str.codePointAt(i))) < 0) continue;
        width += w;
    }

    return width;
}

export { wcwidth, wcswidth };