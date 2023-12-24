import { wcswidth } from '../src/index.js';
import { suite } from 'uvu';
import { is } from 'uvu/assert';

const test = suite('wcswidth');

test('regular strings', () => {
    is(wcswidth('Hello World!'), 'Hello World!'.length);
});

test('multibyte strings', () => {
    is(wcswidth('字的模块'), 8);
});

test('ignore control characters', () => {
    is(wcswidth('abc\n简单测试\ndef\n'), 14);
});

test.run();