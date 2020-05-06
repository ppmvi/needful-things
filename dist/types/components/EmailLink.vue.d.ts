import { Vue } from 'vue-property-decorator';
export default class EmailLink extends Vue {
    email: string;
    get splittedEmail(): string[];
    sendMail(): void;
}
