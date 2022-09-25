import { Callbacks } from "jquery";

export default {
    methods: {
        playCartSound() {
            let audio = new Audio(base_url + 'audio/success.mp3');
            audio.play();
        },

        translate(en, bn) {
            if (lang == 'bn' && bn != null) {
                return bn;
            }
            return en;
        },


        successMessage(data) {
            this.$swal({
                icon: data.status,
                title: data.status,
                text: data.message,
                timer: 3000,
                timerProgressBar: true
            });
        },

        validationError(message = 'Please Fillup Form Correctly !!') {
            this.$swal({
                icon: 'error',
                title: 'Oops...',
                text: message,

            });
        },

        deleteConfirmed(callbacks) {
            this.$swal({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                if (result.isConfirmed) callbacks();
            });
        },

        dateTimeFormat(datetime) {
            return moment(datetime).format('DD-MM-YYYY');
        },

        statusName(status) {
            let data = {
                0: "Pending",
                1: "Published",
                2: "Draft",
            };
            return data[status];
        },

        statusColor(status) {
            let data = {
                0: "badge-warning",
                1: "badge-primary",
                2: "badge-danger",
            };
            return data[status];
        },





    },

    mounted() {


    },

    computed: {
        subString() {
            return (content, length, suffix) => {
                return content.substring(0, length) + suffix;
            }
        },

        uppercase() {
            return (getString) => {
                return getString.toUpperCase()
            }
        },

        upperCaseFirst() {
            return (getString) => {
                return getString.charAt(0).toUpperCase() + getString.slice(1);
            }
        },

        capitalizeFirstLetterOfEachWord() {
            return (getString) => {
                //input: const getString = 'i have learned something new today';

                const arr = getString.split(" ");

                for (var i = 0; i < arr.length; i++) {
                    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

                }
                return arr.join(" ");
                ////Outptut: I Have Learned Something New Today
            }
        }



    },

    filters: {
        formatPrice: function(value) {
            let money = parseFloat(value).toFixed(2);

            if (lang == 'bn') {
                let bengali = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
                let part = money.toString().split('.');
                let num = "";

                for (let i = 0; i < part[0].length; ++i) {
                    num += bengali[part[0][i]];
                }
                num += '.';
                for (let i = 0; i < part[1].length; ++i) {
                    num += bengali[part[1][i]];
                }
                money = num;
            }

            return money;
        },

        format(value) {
            if (lang == 'bn') {
                let bengali = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
                let num = "";

                for (let i = 0; i < value.length; ++i) {
                    num += bengali[value[i]];
                }

                value = num;
            }

            return value;
        },

        strippedContent: function(string) {
            return string.replace(/<\/?[^>]+>/ig, " ");
        },

        dateToString(datePassed) {
            const newYears = new Date(datePassed);
            const formattedDate = newYears.toDateString().slice(3);
            const valuedate = formattedDate.split(' ');
            // console.log(valuedate);
            return valuedate[1] + ' ' + valuedate[2] + ', ' + valuedate[3];
            // const formattedDate = format(newYears.toDateString(), 'MMM dd, yyyy');
            // return formattedDate;
        }
    }
}