import './ProfileAvatar.css';

export default function ProfileAvatar(props) {
  const backgroundImage = `url("https://s3.us-east-2.amazonaws.com/assets.waltergaitan.me/avatars/data.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED0aCXVzLWVhc3QtMiJGMEQCIFOKEN3%2BFlMCqxMtysLljR7sPisTFwPZM%2BjYtrr0tbE5AiBsiOauEuSb71gt7ZRl%2FRzjPGnzdpB0lPlRr%2BIMUuntbCr%2FAghmEAAaDDU5NjAyNzg5ODcyNyIMUo6K91in7Cw0nHIcKtwCorsOPQ5hdmBpYarpSs2nZtiCWGQAwC4K00fPMdBlLVUdXGY0gmQHNm5mFGugbXxDRsFkQthFo8XK4105s%2BSAy8rS8U0nsBBYLDviiDJmZGgGspyFIuwlGpyh%2FbQV59PBoEg4mhBusUbapvMFFSMZndRVWU1dj%2BltbWfNRjBybwObeVf4LWDZ%2BnDFZ34gKrPKZapUO3YLlF1h5Q4jiNUP6ozs0%2FNOwhKwxTconEM0ciWalwIs6idhihWD01Lk7rd6%2FleXo9Cptv%2BV%2BQ%2FRFJ00wz69rq3p1x5EnsfBhyEBuuRmFWV9fFbUqXVXIiYPn%2BT6tmTY0AhccQycWmgi69DZmFYfZ1fL6qQD5vqbL6Q9B%2FlksDt3mquVr1FFMIAx%2FaxoM0794zqdFHSdsBPyJ3YxniuYEYtSkxdnb82dY1cGd%2FELxFZugfC3vME%2FRPJt4lRYqJjYcdf4Q%2BaHYHIVML38maMGOrQChmmga2jKu4Tswu0u7%2FGNvore83v%2BzK7jBya4aR6IGXBxZ5ACfW5GDmTdJbB6pWkE3LVGwci%2Fg0EL0UiwtkNgMJtMNdEumjsyejmrwWgIKn7Be%2B0uPS9otLKwKSOatAeZB8vS2IARaQzKMyUigjZ3nyVzoLeKsO%2FeAhW9%2BymUz661wGUNb%2F1e3wOHaELYsHkIf9M3URYch1GtBqyr6D8uhHDiED4VDeVkJ6VrEdfQPUQBT%2FhdnB%2FQONR1Jc9DKekW24hW8SkQMg0teeGwCT3CAq1BH40TgEZB8UAshXHm%2B7kIeYxL4VHQ6YYAiaASpB3elxAz1qalJZvoGYc1YPfP3RaK1P6i%2Fa%2Fh%2FBAbatqd%2BBWTy7ks90D2p4i0zSbxoW0X2N96iwqhu5%2F8OZ4DqystswJgHMA%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230518T204516Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAYVRQH7NT4X4CGJED%2F20230518%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Signature=b5aefcbe960956c81bbe3e501cd8e2d871006ec36f36a121bb173fb39cff6686")`;
  const styles = {
    backgroundImage: backgroundImage,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div
      className="profile-avatar"
      style={styles}
    ></div>
  );
}