import { wcwidth } from '../src/index.js';
import { suite } from 'uvu';
import { is } from 'uvu/assert';

const test = suite('wcwidth');

test('regular character', () => {
    is(wcwidth('a'.codePointAt(0)), 1);
    is(wcwidth(' '.codePointAt(0)), 1);
});

test('wide characters', () => {
    is(wcwidth(0x4E_00), 2); // CJK Ideograph
    is(wcwidth(0x30_42), 2); // Hiragana
    is(wcwidth(0xFF_60), 2); // Fullwidth Forms
    is(wcwidth(0xFF_E0), 2);
    is(wcwidth(0x2_00_00), 2);
    is(wcwidth(0x3_00_00), 2);
});

test('undefined width', () => {
    is(wcwidth(0x00_00), 0); // Null character
    is(wcwidth(0x7F), -1); // 'Delete'
    is(wcwidth('\n'.codePointAt(0)), -1); // New line
});

test('binary search (combining)', () => {
    is(wcwidth(0x07_A7), 0);
});

test.run();