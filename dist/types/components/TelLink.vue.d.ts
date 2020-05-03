import { Vue } from 'vue-property-decorator';
export default class TelLink extends Vue {
    tel: string;
    doNotShowTel: boolean;
    get callableTel(): string;
    call(): void;
}
