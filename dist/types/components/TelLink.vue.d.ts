import { Vue } from 'vue-property-decorator';
export default class TelLink extends Vue {
    tel: string;
    wrapper: boolean;
    call(): void;
}
