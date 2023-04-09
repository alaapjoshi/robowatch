import React, { useState, useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';

export default function data() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://www.thebluealliance.com/api/v3/events/2023", { headers: { 'X-TBA-Auth-Key': "pn7EQlAcawiyWsJ1HpxNgNzvkJg0ajReJ75lPhiCj6FF3G34PEa0bHRiqGzQhRoR" } })
      .then(response => response.json())
      .then(data => {
        // Sort events by newest first
        const sortedEvents = data.sort((a, b) => b.start_date > a.start_date);
        setEvents(sortedEvents);
      })
      .catch(error => console.error(error));
  }, []);

  const renderItem = ({ item }) => (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
      <Text style={{ fontSize: 12, color: '#999' }}>{item.location_name}</Text>
      <Text style={{ fontSize: 12, color: '#999' }}>{item.start_date} - {item.end_date}</Text>
    </View>
  );

  return (
    <FlatList
      data={events}
      renderItem={renderItem}
      keyExtractor={(item) => item.key} // Use a unique identifier for each item
    />
  );
};
