{ pkgs ? import <nixpkgs> { inherit system; },
  system ? builtins.currentSystem,
  nodejs ? pkgs.nodejs }:

let
  npmInputs = import ./npm-env.nix {
    inherit pkgs system nodejs;
    packages = [
      "typescript" 
      { webpack = "2.6.1"; }
      { typings = "2.1.1"; }
    ];
  };
in

with pkgs;
stdenv.mkDerivation {
  name = "clock-2";
  buildInputs = npmInputs;
}
