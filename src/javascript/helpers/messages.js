export const messages = {
    en: {
        fighter: {
            select: 'Select',
            saveChanges: 'Save changes',
            cancel: 'Cancel'
        },
        fight: {
            start: 'Start Fight',
            strike: 'Strike',
            exit: 'Exit Battle',
            startAgain: 'Start again',
            result: {
                title: 'Fight Results',
                winner: {
                    single: 'Winner is: ',
                    multiple: 'It\'s a draw! Winners are: '
                }
            }
        },
        validation: {
            valid: 'Looks Good!',
            invalid: {
                attack: 'Error! Allowed values are (0, 10]',
                health: 'Error! Allowed values are [20, 80]',
            }
        },
        failedToLoadData: 'Failed to load data',
        failedToLoad: 'Failed to load'
    },
    ua: {
        fighter: {
            select: 'Вибір',
            saveChanges: 'Зберегти',
            cancel: 'Відміна'
        },
        fight: {
            start: 'Почати бій',
            strike: 'Удар',
            exit: 'Вийти з бійки',
            startAgain: 'Новий бій',
            result: {
                title: 'Результати бійки',
                winner: {
                    single: 'Переможець: ',
                    multiple: 'Це нічия! Переможці: '
                }
            }
        },
        validation: {
            valid: 'Все добре!',
            invalid: {
                attack: 'Помилка! Введіть число більше нуля, але не більше десяти.',
                health: 'Помилка! Введіть число від 20 до 80 включно.',
            }
        },
        failedToLoadData: 'Помилка завантаження даних',
        failedToLoad: 'Помилка завантаження'
    }
};
