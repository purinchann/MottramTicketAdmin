import { AngularFirestore } from '@angular/fire/firestore';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { UserDataStore } from '../store/user.store';
import { ShopDataStore } from '../store/shop.store';
import { OrderDataStore } from '../store/order.store';
import { MessageDataStore } from '../store/message.store';
import { AuthGuard } from '../guard/auth.guard';
import { AuthService } from '../service/auth.service';
import { ApiService } from '../service/api.service';

export const providers = [
    AngularFirestore,
    // Service
    AuthService,
    ApiService,
    // Guard
    AuthGuard,
    // DataStore
    UserDataStore,
    ShopDataStore,
    OrderDataStore,
    MessageDataStore,
    // Module
    MatDatepickerModule
]