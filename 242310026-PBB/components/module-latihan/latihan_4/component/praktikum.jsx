import React from 'react';
import { ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ListBook } from '../../../constants/list_books';
import BookCollections from './components/BookCollections';
import Categoriesnav from './components/Categories';
import CTABook from './components/CTABook';
import Header from './components/Header';
import { color_list, styles } from './styles/StyleApps';

export default function HomeScreen() {
  const lastBook = ListBook[ListBook.length - 1];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      
      {/* HEADER */}
      <Header />
      {/* END HEADER */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* MAIN CONTENT */}
        <View style={{ flex: 1 }}>
          <CTABook book={lastBook} />
          <Categoriesnav />
          <BookCollections books={ListBook} />
        </View>
        {/* END MAIN CONTENT */}

        {/* FOOTER */}
        <View>
          <Text style={{ color: color_list.green }}>
            &copy; 2026 Febry Damatraseta Fairuz
          </Text>
        </View>
        {/* END FOOTER */}
      </ScrollView>
    </SafeAreaView>
  );
}